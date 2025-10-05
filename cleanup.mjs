import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function cleanupDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const db = client.db("steam_apps");
    const collection = db.collection("time");

    // Check how many students exist before deletion
    const existingCount = await collection.countDocuments();
    console.log(`Found ${existingCount} games in the database`);

    if (existingCount === 0) {
      console.log("No Games. Database is already clean!");
    } else {
      // Delete all students
      const result = await collection.deleteMany({});
      console.log(`Successfully deleted ${result.deletedCount} games!`);
      
      // Verify deletion
      const remainingCount = await collection.countDocuments();
      console.log(`Games remaining: ${remainingCount}`);
      
      if (remainingCount === 0) {
        console.log("✅ Database cleanup completed successfully!");
        console.log("💡 Tip: Run 'npm run seed' to add sample students back");
      }
    }

  } catch (error) {
    console.error("Error cleaning up database:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Database connection closed");
  }
}

// Run the cleanup function
cleanupDatabase().catch(console.dir);
