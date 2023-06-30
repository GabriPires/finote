export function nameAbbreviation(name: string) {
  const splittedName = name.split(' ')

  const twoFirstLettersOfEachName =
    splittedName.length >= 2
      ? splittedName
          .map((name) => {
            return name.slice(0, 1)
          })
          .join('')
      : splittedName[0].slice(0, 1)

  return twoFirstLettersOfEachName
}
