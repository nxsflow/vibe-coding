import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  NoteType: a.enum(["MEETING", "READING", "THINKING"]),
  Note: a
    .model({
      title: a.string().required(),
      content: a.json().required(), // JSON string containing blocks
      type: a.ref("NoteType").required(),
      people: a.hasMany("PersonNote", "noteId"),
      projects: a.hasMany("ProjectNote", "noteId"),
      companies: a.hasMany("CompanyNote", "noteId"),
      bookId: a.id(),
      book: a.belongsTo("Book", "bookId"),
      articleId: a.id(),
      article: a.belongsTo("Article", "articleId"),
      resources: a.hasMany("Resource", "noteId"),
      versions: a.hasMany("NoteVersion", "noteId"),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization((allow) => [allow.owner()])
    .secondaryIndexes((index) => [
      index("type").sortKeys(["createdAt"]),
      index("type").sortKeys(["updatedAt"]),
    ]),

  Person: a
    .model({
      name: a.string().required(),
      notes: a.hasMany("PersonNote", "personId"),
    })
    .authorization((allow) => [allow.owner()]),
  PersonNote: a
    .model({
      personId: a.id().required(),
      person: a.belongsTo("Person", "personId"),
      noteId: a.id().required(),
      note: a.belongsTo("Note", "noteId"),
      blockId: a.string().required(),
    })
    .authorization((allow) => [allow.owner()]),

  Project: a
    .model({
      name: a.string().required(),
      notes: a.hasMany("ProjectNote", "projectId"),
    })
    .authorization((allow) => [allow.owner()]),
  ProjectNote: a
    .model({
      projectId: a.id().required(),
      project: a.belongsTo("Project", "projectId"),
      noteId: a.id().required(),
      note: a.belongsTo("Note", "noteId"),
      blockId: a.string().required(),
    })
    .authorization((allow) => [allow.owner()]),

  Book: a
    .model({
      title: a.string().required(),
      authors: a.string().required(),
      year: a.integer().required(),
      notes: a.hasMany("Note", "bookId"),
    })
    .authorization((allow) => [allow.owner()]),

  Article: a
    .model({
      title: a.string().required(),
      authors: a.string().required(),
      publishedAt: a.datetime().required(),
      url: a.string().required(),
      note: a.hasOne("Note", "articleId"),
    })
    .authorization((allow) => [allow.owner()]),

  Company: a
    .model({
      name: a.string().required(),
      notes: a.hasMany("CompanyNote", "companyId"),
    })
    .authorization((allow) => [allow.owner()]),
  CompanyNote: a
    .model({
      companyId: a.id().required(),
      company: a.belongsTo("Company", "companyId"),
      noteId: a.id().required(),
      note: a.belongsTo("Note", "noteId"),
      blockId: a.string().required(), // ID of the block within the note content
    })
    .authorization((allow) => [allow.owner()]),

  ResourceType: a.enum(["PDF", "Image"]),
  Resource: a
    .model({
      type: a.ref("ResourceType").required(),
      s3Key: a.string().required(),
      summary: a.string(),
      noteId: a.id().required(),
      note: a.belongsTo("Note", "noteId"),
      blockId: a.string().required(), // ID of the block within the note content
    })
    .authorization((allow) => [allow.owner()]),

  NoteVersion: a
    .model({
      noteId: a.id().required(),
      note: a.belongsTo("Note", "noteId"),
      content: a.json().required(),
      versionNumber: a.integer().required(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
