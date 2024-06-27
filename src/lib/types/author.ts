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
	rorId: string;
};

export interface ListAuthor extends Author {
	orcId: string | null;
	isPrimaryContact: boolean;
	primaryContact: PrimaryContact | null;
}

export type ImportAuthor = {
	firstName: string;
	initials?: string;
	familyName: string;
	orcId?: string;
};
