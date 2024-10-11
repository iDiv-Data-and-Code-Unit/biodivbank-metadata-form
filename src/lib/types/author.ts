export type Author = {
	id: string;
	firstName: string;
	initials: string;
	familyName: string;
};

export type PrimaryContact = {
	email: string;
	institutionName: string;
	institutionCountry: string;
	ror: string;
	noRor: boolean;
};

export interface ListAuthor extends Author {
	id:string;
	orcId: string | null;
	noOrcId: boolean;
	isPrimaryContact: boolean;
	primaryContact: PrimaryContact | null;
}

export type ImportAuthor = {
	firstName: string;
	initials?: string;
	familyName: string;
	orcId?: string;
};
