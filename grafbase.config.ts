import { graph, config , connector , auth} from '@grafbase/sdk'

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone()

// Data Sources - https://grafbase.com/docs/connectors
//
const pg = connector.Postgres('pg', { url: g.env('postgresql://harshit:password@localhost:5432/net') })
const oidc = auth.OpenIDConnect({ issuer: g.env('https://your-auth0-domain/.well-known/openid-configuration') })
 g.datasource(pg)

// Resolvers - https://grafbase.com/docs/resolvers

g.query('helloWorld', {
  returns: g.string(),
   resolver: 'hello-world',
 })

export default config({
  graph: g,
  // Authentication - https://grafbase.com/docs/auth
  auth: {
    // OpenID Connect
    
    providers: [oidc],
    rules: (rules) => {
      rules.public()
    },
  },
  // Caching - https://grafbase.com/docs/graphql-edge-caching
   cache: {
     rules: [
       {
         types: ['Query'], // Cache everything for 60 seconds
         maxAge: 60,
         staleWhileRevalidate: 60
       }
     ]
   }
})
