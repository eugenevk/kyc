export class OC_Company {
    constructor (
        public name: string,
        public company_number: string,
        public jurisdiction_code: string,
        public incorporation_date: string,
        public dissolution_date: string,
        public company_type: string,
        public registry_url: string,
        public branch: string,
        public branch_status: string,
        public inactive: boolean,
        public current_status: string,
        public created_at: string,
        public updated_at: string,
        public retrieved_at: string,
        public opencorporates_url: string,
        public previous_names: {
            company_name: string,
            start_date: string,
            end_date: string
        }[],
        public source: {
            publisher: string,
            url: string,
            terms: string,
            retrieved_at: string
        },
        public registered_address: {
            street_address: string,
            locality: string,
            region: string,
            postal_code: string,
            country: string
        },
        public registered_address_in_full: string,
        public industry_codes: {
            code: string,
            description: string,
            code_scheme_id: string,
            code_scheme_name: string,
            uid: string
        }[],
        public restricted_for_marketing: string,
        public native_company_number: string
    ) {}
}