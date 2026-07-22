export interface INote {
  _id: string;
  userId: string;
  algorithmId?: string;
  title: string;
  content: string;
  isBookmarked: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateNoteDto {
  algorithmId?: string;
  title: string;
  content: string;
  tags?: string[];
}

export interface IUpdateNoteDto {
  title?: string;
  content?: string;
  tags?: string[];
  isBookmarked?: boolean;
}
