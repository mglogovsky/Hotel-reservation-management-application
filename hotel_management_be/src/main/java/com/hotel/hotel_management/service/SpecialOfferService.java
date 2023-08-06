package com.hotel.hotel_management.service;

import com.hotel.hotel_management.model.SpecialOffer;
import com.hotel.hotel_management.repository.SpecialOfferRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class SpecialOfferService {

    private final Logger log = LoggerFactory.getLogger(SpecialOfferService.class);
    private final SpecialOfferRepository specialOfferRepository;

    public SpecialOffer save(SpecialOffer specialOffer) {
        log.debug("Request to save SpecialOffer : {}", specialOffer);
        return specialOfferRepository.save(specialOffer);
    }
    
    public SpecialOffer update(SpecialOffer specialOffer) {
        log.debug("Request to update SpecialOffer : {}", specialOffer);
        return specialOfferRepository.save(specialOffer);
    }

    public SpecialOffer findAllByRoomTypeAndDateBetween(String code, LocalDate date, Integer roomTypeId){
        return specialOfferRepository.findAllByRoomTypeAndDateBetween(code, date, roomTypeId);
    }
    
    @Transactional(readOnly = true)
    public List<SpecialOffer> findAll() {
        log.debug("Request to get all SpecialOffers");
        return specialOfferRepository.findAllByIsActiveTrue();
    }

    @Transactional(readOnly = true)
    public Optional<SpecialOffer> findOne(Long id) {
        log.debug("Request to get SpecialOffer : {}", id);
        return specialOfferRepository.findById(id);
    }

    public void delete(Long id) {
        log.debug("Request to delete SpecialOffer : {}", id);
        Optional<SpecialOffer> specialOffer = specialOfferRepository.findById(id);
        if (!specialOffer.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Special offer not exist!");
        }
        specialOffer.get().setIsActive(false);
        specialOfferRepository.save(specialOffer.get());
    }
}
