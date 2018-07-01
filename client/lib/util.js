import moment from 'moment';

// for displaying Avatars as the first letter of someones name
export const parseNameForAvatar = name => name[0].toUpperCase();

// convert milliseconds to timereadable
export const msToMinutes = time => {
    const t = moment.duration(time);
    const { seconds, minutes } = t._data;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
}

export default {} // this is needed or else compiler fails