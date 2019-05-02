export class Application {
    constructor (
        public id: number,
        public applicant_name: string,
        public company_id: string,
        public company_name: string,
        public registered_address: string,
        public jurisdiction_code: string,
        public application_date: Date,
        public product_code: string,
        public amount: number
    ) {}
}
