const app = require('./app/app');

async function main() {
    app.init()
    app.start();
}

main().catch((err) => {
    console.error(err);

    process.exit(1);
});
