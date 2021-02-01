interface Dataset {
    skills_summary: any[];
    skills: any[];
    minigames: any[];
    bosses: any[];
}

export function translateDataset(data: any) {
    let translatedDataset: Dataset = { skills_summary: [], skills: [], minigames: [], bosses: [] };
    for (const datasetType in data) { // tslint:disable-next-line
        for (const datasetTime in data[datasetType]) { // tslint:disable-next-line
            switch (datasetType) {
                case "skills_summary":
                    translatedDataset.skills_summary.push({date: datasetTime, ...data[datasetType][datasetTime]});
                    break;
                case "skills":
                    translatedDataset.skills.push({date: datasetTime, ...data[datasetType][datasetTime]});
                    break;
                case "minigames":
                    translatedDataset.minigames.push({date: datasetTime, ...data[datasetType][datasetTime]});
                    break;
                case "bosses":
                    translatedDataset.bosses.push({date: datasetTime, ...data[datasetType][datasetTime]});
                    break;
                default:
                    console.log("bad dataset type");
                    break;
            }
        }
    }
    return translatedDataset;
}