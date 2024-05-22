// 'use client';

import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { useEffect, useState } from 'react';

// The path of your codegen files. You may need to update this.
// import { publish } from '/Users/debjit/Drawer/astrotechlabs/mypubsub-app/src/graphql/mutations.ts'
import { subscribe } from '/Users/debjit/Drawer/astrotechlabs/mypubsub-app/src/graphql/subscriptions.ts';

// Your Amplify configuration.
Amplify.configure({
    API: {
        GraphQL: {
            endpoint: 'https://zzf363g765hvnfx5p7arpvswaq.appsync-api.eu-central-1.amazonaws.com/graphql',
            region: 'eu-central-1',
            defaultAuthMode: 'apiKey',
            apiKey: 'da2-kv4x7vxb7neu7g5ehpmtzmxsdy',
        },
    },
});

const client = generateClient();

export default function RealtimeStarterPage() {
    // const [data, setData] = useState('');
    const [received, setReceived] = useState('');

    // Define the channel name here
    let name = '0x43f29de999740c3bd68a50e6b298ab36baf73355f1813958257637c985fe07eb';

    // Publish data to subscribed clients
    // async function handleSubmit(evt) {
    //     evt.preventDefault();
    //     if (!data) return;
    //     console.log("debjit", name, data, typeof data)
    //     await client.graphql({
    //         query: publish,
    //         variables: { name, data },
    //     });
    // }

    // subscribe to events
    useEffect(() => {
        const sub = client.graphql({ query: subscribe, variables: { name } }).subscribe({
            next: ({ data }) => setReceived(data.subscribe.data),
            error: (error) => console.warn(error),
        });
        return () => sub.unsubscribe();
    }, [name]);

    return (
    <div className="App">
        <header className="App-header">
        <p>Send/Push JSON to channel &quot;{name}&quot;...</p>
        {/* <form onSubmit={handleSubmit}>
            <textarea
            rows="5"
            cols="60"
            name="description"
            onChange={(e) => setData(e.target.value)}
            value={data}
            placeholder="Enter valid JSON here... (use quotes for keys and values)"
            ></textarea>
            <br />
            <input type="submit" value="Submit" />
        </form> */}
        <p>Subscribed/Listening to channel &quot;{name}&quot;...</p>
        <pre>{!received || JSON.stringify(JSON.parse(received), null, 2)}</pre>
        </header>
    </div>
    );
}