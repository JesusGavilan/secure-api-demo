exports.summary = (req,res, next) => {
    res.setHeader('Content-Type', 'application/json')
    return dbEmulatorService("summary")
        .then(result => {res.status(200).send(JSON.stringify(result))})
        .catch(error => {res.status(400).send(JSON.stringify(error))})

}

exports.collaborators = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    return dbEmulatorService("collaborators")
        .then(result => {res.status(200).send(JSON.stringify(result))})
        .catch(error => {res.status(400).send(JSON.stringify(error))})

}

dbEmulatorService = (item) => {
    return new Promise((resolve, reject) =>
    {
        const collaborators = [{name: "Jon", surname: "Lenovo", pagerank: 1.05}, {
            name: "Albert",
            surname: "Einstein",
            pagerank: 0.8
        }];
        const summary = [{repository: "apache-spark", commits: 120, lines: 1465}, {
            repository: "apache-huid",
            commits: 12,
            lines: 142
        }]
        if (item === "collaborators") {
            resolve(collaborators);
        } else if (item === "summary") {
            resolve(summary)
        }
    })
}