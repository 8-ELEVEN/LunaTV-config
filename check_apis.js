// check_apis.js
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const configPath = path.join(__dirname, 'luna-tv-config.json');
const reportPath = path.join(__dirname, 'report.md');
const MAX_DAYS = 30;
const WARN_STREAK = 3; // 连续失败天数阈值

// 获取当前 CST 时间
const now = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().replace("T", " ").slice(0, 16) + " CST";

// 读取历史记录
let history = [];
if (fs.existsSync(reportPath)) {
  const oldReport = fs.readFileSync(reportPath, 'utf-8');
  const match = oldReport.match(/```json\n([\s\S]+?)\n```/);
  if (match) history = JSON.parse(match[1]);
}

// 检查重复 API
const apiCountMap = {};

// 用来记录配置文件的最后修改时间
let lastModified = fs.existsSync(configPath) ? fs.statSync(configPath).mtime : null;

const loadConfig = () => {
  // 读取 API 配置
  const rawData = fs.readFileSync(configPath);
  const config = JSON.parse(rawData);
  const apiEntries = Object.values(config.api_site).map(site => ({ name: site.name, api: site.api }));

  // 更新 API 地址重复次数统计
  for (const { api } of apiEntries) {
    apiCountMap[api] = (apiCountMap[api] || 0) + 1;
  }

  return apiEntries;
};

let apiEntries = loadConfig();

// 检查配置文件是否有更新
const checkConfigFileUpdate = () => {
  const currentModified = fs.existsSync(configPath) ? fs.statSync(configPath).mtime : null;
  if (currentModified && currentModified > lastModified) {
    console.log('luna-tv-config.json 文件已更新，重新加载配置...');
    lastModified = currentModified;
    apiEntries = loadConfig(); // 重新加载配置
  }
};

(async () => {
  const todayResults = [];

  // 每次运行时，先检测配置文件是否更新
  checkConfigFileUpdate();

  for (const { name, api } of apiEntries) {
    try {
      const res = await axios.get(api, { timeout: 10000 });
      todayResults.push({ name, api, success: res.status === 200 });
    } catch (e) {
      todayResults.push({ name, api, success: false });
    }
  }

  // 更新历史记录
  history.push({ date: new Date().toISOString().slice(0, 10), results: todayResults });
  if (history.length > MAX_DAYS) history = history.slice(-MAX_DAYS);

  // 统计每个 API 的成功/失败次数和连续失败天数
  const stats = {};
  for (const { name, api } of apiEntries) {
    stats[api] = { name, ok: 0, fail: 0, fail_streak: 0, status: "❌", duplicate: apiCountMap[api] > 1 };
    let streak = 0;

    for (const day of history) {
      let r = day.results.find(x => x.api === api);
      if (!r) continue; // 历史中不存在则跳过

      if (r.success) {
        stats[api].ok++;
        streak = 0;
      } else {
        stats[api].fail++;
        streak++;
      }
      stats[api].fail_streak = streak;
    }

    // 判断状态
    const latest = todayResults.find(x => x.api === api);
    if (stats[api].fail_streak >= WARN_STREAK) stats[api].status = "🚨";
    else if (latest?.success) stats[api].status = "✅";
    else stats[api].status = "❌";

    // 如果 API 重复，加上重复标记
    if (stats[api].duplicate) stats[api].status = "🔁";
  }

  // 统计总 API 数量和重复数量
  const totalAPIs = apiEntries.length;
  const duplicateAPIs = Object.values(apiCountMap).filter(count => count > 1).length;

  console.log(`总 API 数量: ${totalAPIs}`);
  console.log(`重复 API 数量: ${duplicateAPIs}`);

  // 生成 Markdown 报告
  let md = `# API 健康检查报告\n\n最近更新：${now}\n\n`;
  md += `**总 API 数量:** ${totalAPIs}  |  **重复 API 数量:** ${duplicateAPIs}\n\n`;
  md += `## 最近 ${MAX_DAYS} 天 API 健康统计\n\n`;
  md += "| 状态 | API 名称 | API 地址 | 成功次数 | 失败次数 | 可用率 | 连续失败天数 |\n";
  md += "|------|----------|----------|---------:|---------:|-------:|-------------:|\n";

  for (const { name, api } of apiEntries) {
    const s = stats[api];
    const total = s.ok + s.fail;
    const rate = total > 0 ? ((s.ok / total) * 100).toFixed(1) + "%" : "-";
    md += `| ${s.status} | ${s.name} | ${api} | ${s.ok} | ${s.fail} | ${rate} | ${s.fail_streak} |\n`;
  }

  md += `\n## 详细历史数据 (JSON)\n`;
  md += "```json\n" + JSON.stringify(history, null, 2) + "\n```\n";

  fs.writeFileSync(reportPath, md, 'utf-8');
})();
