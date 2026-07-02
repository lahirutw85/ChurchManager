package com.churchmanager.api.service;

import com.churchmanager.api.model.Event;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class EventService {

    private static final String COLLECTION_NAME = "events";

    @Autowired
    private Firestore firestore;

    public List<Event> getAllEvents() throws ExecutionException, InterruptedException {
        CollectionReference collection = firestore.collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot snapshot = future.get();
        List<Event> list = new ArrayList<>();
        for (QueryDocumentSnapshot doc : snapshot.getDocuments()) {
            Event event = doc.toObject(Event.class);
            event.setId(doc.getId());
            list.add(event);
        }
        return list;
    }

    public Event getEventById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot doc = future.get();
        if (doc.exists()) {
            Event event = doc.toObject(Event.class);
            event.setId(doc.getId());
            return event;
        }
        return null;
    }

    public Event createEvent(Event event) throws ExecutionException, InterruptedException {
        CollectionReference collection = firestore.collection(COLLECTION_NAME);
        event.setCreatedAt(Instant.now().toString());
        event.setStatus("scheduled");
        
        ApiFuture<DocumentReference> future = collection.add(event);
        DocumentReference docRef = future.get();
        event.setId(docRef.getId());
        
        docRef.update("id", docRef.getId());
        return event;
    }
}
