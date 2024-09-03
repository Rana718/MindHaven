export interface AffirmationCategory {
    title: string;
    data: GalleryPreviewData[];
}

export interface GalleryPreviewData {
    id: number;
    title: string;
    image: string;
}