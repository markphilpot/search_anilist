import { MediaFormat } from '../../graphql/types/globalTypes';

export const formatMediaFormat = (format: MediaFormat | null) => {
  switch (format) {
    case MediaFormat.OVA:
    case MediaFormat.ONA:
    case MediaFormat.TV:
      return format;
    case MediaFormat.ONE_SHOT:
      return 'One Shot';
    case MediaFormat.TV_SHORT:
      return 'Short';
    case null:
      return '';
    default:
      return format[0].toUpperCase() + format.substring(1).toLowerCase();
  }
};
