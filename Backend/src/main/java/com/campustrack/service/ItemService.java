package com.campustrack.service;

import com.campustrack.entity.Item;
import com.campustrack.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // 🔹 Create or update a report
    public Item save(Item item) {
        return itemRepository.save(item);
    }

    // 🔹 Get all reports
    public List<Item> findAll() {
        return itemRepository.findAllByOrderByDateDesc();
    }

    // 🔹 Get reports by status (LOST/FOUND)
    public List<Item> findByStatus(String status) {
        return itemRepository.findByStatusOrderByDateDesc(status);
    }

    // 🔹 Get reports by category
    public List<Item> findByCategory(String category) {
        return itemRepository.findByCategoryOrderByDateDesc(category);
    }

    // 🔹 Get reports by reporter
    public List<Item> findByReporter(Long reporterId) {
        return itemRepository.findByReporterIdOrderByDateDesc(reporterId);
    }

    // 🔹 Per-user counts
    public long countByReporterAndStatus(Long reporterId, String status) {
        return itemRepository.countByReporterIdAndStatus(reporterId, status);
    }

    // 🔹 Global counts
    public long countByStatus(String status) {
        return itemRepository.countByStatus(status);
    }

    // 🔹 Delete report (Admin only, handled in controller)
    public void deleteById(Long id) {
        itemRepository.deleteById(id);
    }


}
