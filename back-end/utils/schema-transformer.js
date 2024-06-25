/**
 * To help transform our return values to have an id property
 * instead of the "_id"
 * @param doc mongodb return documen
*/
export default function SchemaTransformer(document) {
  if (!document) return null;

  if (Array.isArray(document)) return document.map(doc => {
    const { _id, ...data } = doc;

    if (doc?._doc) {
      delete doc._doc._id;
    }

    return {
      id: _id,
      ...(data?._doc || data),
    }
  });

  const data = (document?._doc || document);

  const { _id, ...res } = data;

  return {
    id: _id,
    ...res
  }
};
