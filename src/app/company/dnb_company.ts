export class DNB_Company {
    constructor (
        public SubjectHeader: {
            DUNSNumber: string
        },
        public Location: {
            PrimaryAddress: {
                StreetAddressLine: {
                    LineText: string
                }[],
                PrimaryTownName: string,
                CountryISOAlpha2Code: string,
                PostalCode: string,
                CountryOfficialName: string
            }[]
        },
        public OrganizationName: {
            OrganizationPrimaryName: {
                OrganizationName: {
                    $: string
                }
            }[]
        },
        public OrganizationDetail: {
            ControlOwnershipTypeText: {
                DNBCodeValue: number,
                $: string
            },
            OutofBusinessIndicator: boolean
        }
    ) {}
}