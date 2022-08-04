import {v4 as uuidv4} from 'uuid';
import {addDays, subDays} from 'date-fns'


export const data = [
    {
        projectId: uuidv4(),
        projectTitle: "Review Research Papers",
        tasks: [
            {
                taskId: uuidv4(),
                taskTitle: "Conduct Google Search",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, lorem vitae elementum viverra, velit augue venenatis neque, ut ornare lacus ipsum non orci. ",
                status: "In Progress",
                start: JSON.stringify(addDays(new Date(), 9)),
                end: JSON.stringify(addDays(new Date(), 10))
            },
            {
                taskId: uuidv4(),
                taskTitle: "Interview Users",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, lorem vitae elementum viverra, velit augue venenatis neque, ut ornare lacus ipsum non orci. ",
                status: "Completed",
                start: JSON.stringify(addDays(new Date(), 8)),
                end: JSON.stringify(addDays(new Date(), 8))
            },
        ]

    },
    {
        projectId: uuidv4(),
        projectTitle: "Review Research Papers",
        tasks: [
            {
                taskId: uuidv4(),
                taskTitle: "Conduct Google Search",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, lorem vitae elementum viverra, velit augue venenatis neque, ut ornare lacus ipsum non orci. ",
                status: "In Progress",
                start: JSON.stringify(addDays(new Date(), 6)),
                end: JSON.stringify(addDays(new Date(), 7))
            },

        ]

    },
    {
        projectId: uuidv4(),
        projectTitle: "Design User Interface",
        tasks: [
            {
                taskId: uuidv4(),
                taskTitle: "Check behnace for inspiration",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, lorem vitae elementum viverra, velit augue venenatis neque, ut ornare lacus ipsum non orci. ",
                status: "In Progress",
                start: JSON.stringify(addDays(new Date(), 3)),
                end: JSON.stringify(addDays(new Date(), 5))
            },

        ]

    }, {
        projectId: uuidv4(),
        projectTitle: "Preparation id Work Space",
        tasks: [
            {
                taskId: uuidv4(),
                taskTitle: "Set Up Enivronment on Laptop",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, lorem vitae elementum viverra, velit augue venenatis neque, ut ornare lacus ipsum non orci. ",
                status: "Completed",
                start: JSON.stringify(subDays(new Date(), 1)),
                end: JSON.stringify(subDays(new Date(), 2))
            },

        ]
    }
]