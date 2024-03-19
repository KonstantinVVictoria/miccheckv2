export async function stall(milliseconds: number) {
  return new Promise((res) =>
    setTimeout(() => {
      res(null);
    }, milliseconds)
  );
}
