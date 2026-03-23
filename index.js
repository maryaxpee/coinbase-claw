require('dotenv').config();
const chalk = require('chalk');
const { connectCoinbase } = require('./coinbase');
const { connectOpenclaw } = require('./openclaw');

const banner = `
 ██████╗ ██████╗ ██╗███╗   ██╗██████╗  █████╗ ███████╗███████╗
██╔════╝██╔═══██╗██║████╗  ██║██╔══██╗██╔══██╗██╔════╝██╔════╝
██║     ██║   ██║██║██╔██╗ ██║██████╔╝███████║███████╗█████╗  
██║     ██║   ██║██║██║╚██╗██║██╔══██╗██╔══██║╚════██║██╔══╝  
╚██████╗╚██████╔╝██║██║ ╚████║██████╔╝██║  ██║███████║███████╗
 ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝

                    ×  O P E N C L A W
`;

async function main() {
  console.log(chalk.cyan(banner));
  console.log(chalk.gray('─'.repeat(60)));
  console.log(chalk.bold(' 🚀 Starting Coinbase × Openclaw...'));
  console.log(chalk.gray('─'.repeat(60) + '\n'));

  // Validate environment
  const required = ['COINBASE_API_KEY', 'COINBASE_API_SECRET', 'OPENCLAW_API_KEY'];
  const missing = required.filter(k => !process.env[k]);

  if (missing.length > 0) {
    console.error(chalk.red(`\n❌ Missing required environment variables:\n`));
    missing.forEach(k => console.error(chalk.red(`   • ${k}`)));
    console.error(chalk.yellow(`\n💡 Copy .env.example to .env and fill in your credentials.\n`));
    process.exit(1);
  }

  try {
    console.log(chalk.blue(' 🔗 Connecting to Coinbase...'));
    await connectCoinbase();
    console.log(chalk.green(' ✅ Coinbase connected\n'));

    console.log(chalk.blue(' 🔗 Connecting to Openclaw...'));
    await connectOpenclaw();
    console.log(chalk.green(' ✅ Openclaw connected\n'));

    console.log(chalk.gray('─'.repeat(60)));
    console.log(chalk.bold.green(' ✨ Application is running!\n'));
  } catch (err) {
    console.error(chalk.red('\n❌ Startup failed:'), err.message);
    process.exit(1);
  }
}

main();
