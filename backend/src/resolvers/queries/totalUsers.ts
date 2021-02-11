export const totalUsers = (parent: any, args: any, { db }: any) => {
  return db.collection('users').estimatedDocumentCount();
}