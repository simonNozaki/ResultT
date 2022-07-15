declare const map: <T, R>(transformer: (t: T) => R, elements: T[]) => R[];
declare const filter: <T>(predicate: (t: T) => boolean, elements: T[]) => T[];
declare const println: (o: any) => void;
