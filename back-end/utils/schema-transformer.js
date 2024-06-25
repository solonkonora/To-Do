/**
 * To help transform our return values to have an id property
 * instead of the "_id"
 * @param doc mongodb return documen
*/
export default function SchemaTransformer(document) {
  if (!document) return null;

  const data = (document?._doc || document);

  const { _id, ...res } = data;

  return {
    id: _id,
    ...res
  }
};
