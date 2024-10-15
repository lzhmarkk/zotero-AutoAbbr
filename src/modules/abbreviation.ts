export interface Publication {
  abbr: string;
  full: string;
  publisher: string;
  category: string;
}


function matchKeyWord(S: string, keyword: string, ignore_case: boolean): boolean {
  if (ignore_case) {
    return S.toLowerCase().includes(keyword.toLowerCase());
  } else {
    return S.includes(keyword);
  }
}

function matchKeyWords(S: string, words: string[], ignore_case: boolean): boolean {
  return words.every((w) => matchKeyWord(S, w, ignore_case));
}


export function matchAbbreviation(name: string, mapping: Publication[]){
  const regex = (pattern: string) => new RegExp(`${pattern}`, 'g');
  return mapping.filter(e => name.includes(e.abbr))
}


export function matchFullName(name: string, mapping: Publication[]) {
  const skip_words = ['ACM', 'IEEE', '\/']
  return mapping.filter(e => {
    const regex = new RegExp(skip_words.join('|').toLowerCase(), 'gi');
    const full =  e.full.replace(regex, ' ').trim();
    return name.includes(full);
  })
}
