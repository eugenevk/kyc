export class Product {
    constructor (
        public key: string,
        public label: string,
        public risk_score: boolean,
        public amount_needed: boolean
    ) {}
}
