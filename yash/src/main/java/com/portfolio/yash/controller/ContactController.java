package com.portfolio.yash.controller;

import com.portfolio.yash.dto.ContactMessageDto;
import com.portfolio.yash.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageService contactMessageService;

    @PostMapping
    public ResponseEntity<ContactMessageDto> sendMessage(
            @Valid @RequestBody ContactMessageDto request) {

        ContactMessageDto savedMessage =
                contactMessageService.create(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedMessage);
    }
}