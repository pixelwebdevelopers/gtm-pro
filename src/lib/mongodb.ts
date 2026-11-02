import { MongoClient } from "mongodb";

function getMongoUri(): string {
  let uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:admin%406015@gtm-pro.2lhts3u.mongodb.net/gtm_pro?retryWrites=true&w=majority";

  // Clean angle brackets if user entered <admin@6015>
  if (uri.includes("<") && uri.includes(">")) {
    uri = uri.replace(/<([^>]+)>/g, "$1");
  }

  // Ensure password with @ is properly percent-encoded if unencoded
  // e.g. mongodb+srv://admin:admin@6015@gtm-pro... -> admin%406015
  const match = uri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, protocol, username, password, rest] = match;
    if (password.includes("@")) {
      const encodedPass = password.replace(/@/g, "%40");
      uri = `${protocol}${username}:${encodedPass}@${rest}`;
    }
  }

  return uri;
}

const uri = getMongoUri();
const options = {
  serverSelectionTimeoutMS: 8000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
