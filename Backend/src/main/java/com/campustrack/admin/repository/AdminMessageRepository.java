package com.campustrack.admin.repository;

import com.campustrack.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminMessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReporterId(Long reporterId);
    List<Message> findByReportId(Long reportId);
}