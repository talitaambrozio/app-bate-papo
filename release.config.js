const config= {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyser',
        '@semantic-release/release-notes-generator',
        ["@semantic-release/git", {
            "assets": ["dist/*.js", "dist/*.js.map"],
           // "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
           "message": "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
        }],
        '@semantic-release/github'
    ]
};

module.exports = config;