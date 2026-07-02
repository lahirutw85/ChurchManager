package com.churchmanager.api.service;

import com.churchmanager.api.model.Member;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MemberService {

    private static final String COLLECTION_NAME = "members";

    @Autowired
    private Firestore firestore;

    public List<Member> getAllMembers() throws ExecutionException, InterruptedException {
        CollectionReference collection = firestore.collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot snapshot = future.get();
        List<Member> list = new ArrayList<>();
        for (QueryDocumentSnapshot doc : snapshot.getDocuments()) {
            Member member = doc.toObject(Member.class);
            member.setId(doc.getId());
            list.add(member);
        }
        return list;
    }

    public Member getMemberById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot doc = future.get();
        if (doc.exists()) {
            Member member = doc.toObject(Member.class);
            member.setId(doc.getId());
            return member;
        }
        return null;
    }

    public Member createMember(Member member) throws ExecutionException, InterruptedException {
        CollectionReference collection = firestore.collection(COLLECTION_NAME);
        member.setCreatedAt(Instant.now().toString());
        
        // We add the member to the collection, Firestore generates the ID
        ApiFuture<DocumentReference> future = collection.add(member);
        DocumentReference docRef = future.get();
        member.setId(docRef.getId());
        
        // Write the generated ID back to the document
        docRef.update("id", docRef.getId());
        return member;
    }

    public void updateMember(String id, Member member) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        member.setUpdatedAt(Instant.now().toString());
        member.setId(id);
        
        // Set with merge options to only update modified fields
        ApiFuture<WriteResult> future = docRef.set(member, SetOptions.merge());
        future.get();
    }
}
