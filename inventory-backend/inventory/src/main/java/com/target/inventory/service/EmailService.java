package com.target.inventory.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Service
public class EmailService {

    private final SesClient sesClient;

    public EmailService() {
        // 🔐 Replace these with your actual values (for demo only)
        String accessKey = "";
        String secretKey = "";

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKey, secretKey);

        this.sesClient = SesClient.builder()
                .region(Region.US_EAST_1) // You can change the region as needed
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    public void sendEmail(String subject, String body, String toEmail, String fromEmail) {
        Destination destination = Destination.builder()
                .toAddresses(toEmail)
                .build();

        Content subjectContent = Content.builder().data(subject).build();
        Content bodyContent = Content.builder().data(body).build();

        Message message = Message.builder()
                .subject(subjectContent)
                .body(Body.builder().text(bodyContent).build())
                .build();

        SendEmailRequest request = SendEmailRequest.builder()
                .destination(destination)
                .message(message)
                .source(fromEmail)
                .build();

        try {
            sesClient.sendEmail(request);
            System.out.println("✅ Email sent successfully.");
        } catch (SesException e) {
            System.err.println("❌ Email failed: " + e.awsErrorDetails().errorMessage());
        }
    }
    
    public void sendOrderConfirmation(String toEmail, String productName) {
        String subject = "Reorder Confirmation for: " + productName;
        String body = "Your reorder request for the product '" + productName + "' has been successfully processed. Thank you!";
        String fromEmail = "sandeep.gandluri@gmail.com"; // replace with SES-verified email

        sendEmail(subject, body, toEmail, fromEmail);
    }

}
