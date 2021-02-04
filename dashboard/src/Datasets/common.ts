interface Dataset {
    skills_summary: any[];
    skills: any[];
    minigames: any[];
    bosses: any[];
}

export function translateDataset(data: any) {
    let translatedDataset: Dataset = { skills_summary: [], skills: [], minigames: [], bosses: [] };
    if (!data) { return translatedDataset; }

    // eslint-disable-next-line
    data.map(function myFunction(dataset: any) {
        for (const datasetType in dataset) { // tslint:disable-next-line
            switch (datasetType) {
                case "skills_summary":
                    translatedDataset.skills_summary.push({date: dataset.created_date, ...dataset[datasetType]});
                    break;
                case "skills":
                    translatedDataset.skills.push({date: dataset.created_date, ...dataset[datasetType]});
                    break;
                case "minigames":
                    translatedDataset.minigames.push({date: dataset.created_date, ...dataset[datasetType]});
                    break;
                case "bosses":
                    translatedDataset.bosses.push({date: dataset.created_date, ...dataset[datasetType]});
                    break;
                default:
                    console.log("bad dataset type");
                    break;
            }
        }
    });
    return translatedDataset;
}