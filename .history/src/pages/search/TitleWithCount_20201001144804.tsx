import { Typography } from "@material-ui/core";
import * as React from "react"

interface ITitleWithCount {
    entityType: string
}

const titles = {
    jobseeker: "Соискатели",
    vacancy: "Вакансии",
    employer: "Работодатели",
    institution: "Образовательные учреждения"
}

const counts = {
    jobseeker: 1,
    vacancy: 2,
    employer: 3,
    institution: 4
}

export const TitleWithCount = (props) => {
    const title = titles[props.entityType];

    return(
        <Typography variant="h6" style={{ flexGrow: 1, width: "min-content" }}>
            {title + " (Результатов: " + counts[props.entityType] + ")"}
        </Typography>
    )
}