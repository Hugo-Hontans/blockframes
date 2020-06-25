
export interface ExternalMedia {
  /** access url */
  url: string;
}

export function createExternalMedia(media?: Partial<ExternalMedia>): ExternalMedia {
  return {
    url: '',
    ...media,
  }
}

export interface HostedMedia extends ExternalMedia {
  /** firebase storage ref *(path)* */
  ref: string;
}

export function createHostedMedia(media?: Partial<HostedMedia>): HostedMedia {
  return {
    url: '',
    ref: '',
    ...media,
  }
}

export type ImgSizeDirectory = 'lg' | 'md' | 'xs' | 'fallback';

/**
 * This array contains the different image sizes.
 * @note it **does** contains the `fallback` key
 * @note it **does not** contains the `original` key
 */
export const imgSizeDirectory: ImgSizeDirectory[] = ['lg', 'md', 'xs', 'fallback'];

export interface ImgRef {
  original: HostedMedia;
  fallback: HostedMedia;
  xs?: HostedMedia;
  md?: HostedMedia;
  lg?: HostedMedia;
}

export function createImgRef(ref?: Partial<ImgRef>): ImgRef {
  return {
    original: createHostedMedia(),
    fallback: createHostedMedia(),
    xs: createHostedMedia(),
    md: createHostedMedia(),
    lg: createHostedMedia(),
    ...ref
  };
}

export type ImageSizes = Record<ImgSizeDirectory, number>;

export function getImgSize(url: string): ImageSizes {
  if (url.includes('avatar')) {
    return { xs: 50, md: 100, lg: 300, fallback: 1024 };
  } else if (url.includes('logo')) {
    return { xs: 50, md: 100, lg: 300, fallback: 1024 };
  } else if (url.includes('poster')) {
    return { xs: 200, md: 400, lg: 600, fallback: 1024 };
  } else if (url.includes('banner')) {
    return { xs: 300, md: 600, lg: 1200, fallback: 1024 };
  } else if (url.includes('still')) {
    return { xs: 50, md: 100, lg: 200, fallback: 1024 };
  } else {
    throw new Error(`Unknown Image Format in ${url}, known format are ${imgSizeDirectory.join(', ')}`);
  }
}

export interface UploadFile {
  /**
  * firebase storage upload path *(or ref)*,
  * @note **Make sure that the path param does not include the filename.**
  * @note **Make sure that the path ends with a `/`.**
  */
  path: string,
  data: Blob,
  fileName: string,
}
