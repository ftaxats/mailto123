export function truncate(str: string, length: number) {
  return str.length > length ? `${str.slice(0, length)}...` : str;
}

export function removeExcessiveWhitespace(str: string) {
  return (
    str
      // First remove all zero-width spaces, soft hyphens, and other invisible characters
      // Handle each special character separately to avoid combining character issues
      .replace(
        /\u200B|\u200C|\u200D|\u200E|\u200F|\uFEFF|\u3164|\u00AD|\u034F/g,
        " ",
      )
      // Normalize all types of line breaks to \n
      .replace(/\r\n|\r/g, "\n")
      // Then collapse multiple newlines (3 or more) into double newlines
      .replace(/\n\s*\n\s*\n+/g, "\n\n")
      // Clean up spaces around newlines (but preserve double newlines)
      .replace(/[^\S\n]*\n[^\S\n]*/g, "\n")
      // Replace multiple spaces (but not newlines) with single space
      .replace(/[^\S\n]+/g, " ")
      // Clean up any trailing/leading whitespace
      .trim()
  );
}

export function generalizeSubject(subject = "") {
  // replace numbers to make subject more generic
  // also removes [], () ,and words that start with #
  const regex =
    /(\b\d+(\.\d+)?(-\d+(\.\d+)?)?(\b|[A-Za-z])|\[.*?\]|\(.*?\)|\b#\w+)/g;

  // remove any words that contain numbers
  const regexRemoveNumberWords = /\b\w*\d\w*\b/g;

  return subject.replaceAll(regexRemoveNumberWords, "").replaceAll(regex, "");
}