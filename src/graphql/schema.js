import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

const DogType = new GraphQLObjectType({
  name: 'Dog',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    needsWalk: { type: GraphQLBoolean }
  },
});

const CatType = new GraphQLObjectType({
  name: 'Cat',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const PetType = new GraphQLUnionType({
  name: 'Pet',
  types: [ CatType, DogType ],
  resolveType: (value) => value.hasOwnProperty('needsWalk') ? DogType : CatType
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pets: { type: new GraphQLList(PetType) }
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey', pets: [
    { id: 'a', name: 'Walt' },
    { id: 'b', name: 'Ann', needsWalk: true },
  ] },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
