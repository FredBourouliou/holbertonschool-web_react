// Brand convention & Nominal typing
interface MajorCredits {
  credits: number;
  brand: "major";
}

interface MinorCredits {
  credits: number;
  brand: "minor";
}

function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    brand: "major"
  };
}

function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    brand: "minor"
  };
}

// Example usage
const majorSubject1: MajorCredits = { credits: 4, brand: "major" };
const majorSubject2: MajorCredits = { credits: 3, brand: "major" };

const minorSubject1: MinorCredits = { credits: 2, brand: "minor" };
const minorSubject2: MinorCredits = { credits: 1, brand: "minor" };

console.log(sumMajorCredits(majorSubject1, majorSubject2)); // { credits: 7, brand: "major" }
console.log(sumMinorCredits(minorSubject1, minorSubject2)); // { credits: 3, brand: "minor" } 