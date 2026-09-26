package com.portfolio.yash.service;

import com.portfolio.yash.dto.ContactMessageDto;
import com.portfolio.yash.entity.ContactMessage;
import com.portfolio.yash.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageDto create(ContactMessageDto dto) {
        ContactMessage message = new ContactMessage();

        message.setName(dto.getName());
        message.setEmail(dto.getEmail());
        message.setMessage(dto.getMessage());

        return toDto(repository.save(message));
    }

    public List<ContactMessageDto> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private ContactMessageDto toDto(ContactMessage message) {
        ContactMessageDto dto = new ContactMessageDto();

        dto.setId(message.getId());
        dto.setName(message.getName());
        dto.setEmail(message.getEmail());
        dto.setMessage(message.getMessage());

        return dto;
    }
}