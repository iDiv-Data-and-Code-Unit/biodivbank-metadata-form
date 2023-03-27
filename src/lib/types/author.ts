export type Author = {
	id: string;
	firstName: string;
	initials: string;
	familyName: string;
};

export interface ListAuthor extends Author {
	orcId: string | null;
	primaryContact: boolean;
}
