const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://singhpuru06_db_user:IOeuhUpvXQFOPMK8@cluster0.m2lakhy.mongodb.net/asu-guide?retryWrites=true&w=majority&appName=Cluster0';

async function debugDatabase() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Step 1: List all databases
    console.log('📋 Listing all databases on the cluster:');
    const adminDb = client.db().admin();
    const databases = await adminDb.listDatabases();
    databases.databases.forEach(db => {
      console.log(`   - ${db.name} (${db.sizeOnDisk} bytes)`);
    });
    console.log('');

    // Step 2: Connect to 'asu-guide' database
    console.log('🎯 Connecting to "asu-guide" database...');
    const db = client.db('asu-guide');
    
    // Step 3: List all collections
    console.log('📂 Collections in "asu-guide":');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    console.log('');

    // Step 4: Count documents in 'classes' collection
    const classesCollection = db.collection('classes');
    const count = await classesCollection.countDocuments();
    console.log(`📊 Document count in "classes" collection: ${count}`);
    
    // Step 5: Get the first document
    console.log('\n📄 First document in "classes" collection:');
    const firstDoc = await classesCollection.findOne();
    console.log(JSON.stringify(firstDoc, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Connection closed.');
  }
}

debugDatabase();
