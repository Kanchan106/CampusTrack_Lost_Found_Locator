package com.campustrack.repository;

import com.campustrack.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByReporterId(Long reporterId);
    List<Message> findByReportId(Long reportId);

    // ✅ Fetch all messages where this reporter is involved
    @Query("SELECT m FROM Message m WHERE m.reporterId = :id OR m.reportId IN " +
            "(SELECT i.id FROM Item i WHERE i.reporterId = :id)")
    List<Message> findAllInvolvingReporter(@Param("id") Long id);
}
