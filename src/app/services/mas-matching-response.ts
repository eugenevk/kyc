export class MASMatchingResponse {
    constructor (
        public links: [],
        public version: number,
        public moduleId: string,
        public stepId: string,
        public outputs: [
            {
                name: string,   // Company ID
                value: string
            },
            {
                name: string,   // Jurisdiction
                value: string
            },
            {
                name: string,   // Applicant name
                value: string
            },
            {
                name: string,   // OC response code
                value: number
            },
            {
                name: string,   // Matching result
                value: string
            }
        ]
    ) {}
}
