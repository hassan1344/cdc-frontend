  // Calculate age from birth date
  export function calculateAge(birthDate) {
    const today = new Date();

    if (!birthDate) return null; // Handle invalid input

    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };