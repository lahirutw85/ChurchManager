package com.churchmanager.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private String id;
    private String memberNo;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String status; // 'active' | 'inactive'
    private String memberStatus; // 'Visitor' | 'Regular' | 'Member' | 'Inactive'
    private String gender; // 'Male' | 'Female' | 'Other'
    private String dob;
    private String nicOrPassport;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String country;
    private String householdName;
    private String maritalStatus; // 'Single' | 'Married' | 'Widowed' | 'Divorced'
    private String spouseName;
    private Integer childrenCount;
    private String joinedDate;
    private String baptismStatus; // 'Not Baptized' | 'Baptized'
    private String baptismDate;
    private String previousChurch;
    private String emergencyName;
    private String emergencyRelationship;
    private String emergencyPhone;
    private String notes;
    private String ministry;
    private String createdAt;
    private String updatedAt;
}
