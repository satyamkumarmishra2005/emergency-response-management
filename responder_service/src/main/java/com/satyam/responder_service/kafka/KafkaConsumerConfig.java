//package com.satyam.responder_service.kafka;
//
//import org.apache.kafka.clients.consumer.ConsumerConfig;
//import org.apache.kafka.common.serialization.StringDeserializer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
//import org.springframework.kafka.core.ConsumerFactory;
//import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
//import org.springframework.kafka.support.serializer.JsonDeserializer;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class KafkaConsumerConfig {
//
//    @Bean
//    public ConsumerFactory<String, Alert> alertConsumerFactory() {
//        Map<String, Object> props = new HashMap<>();
//        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        props.put(ConsumerConfig.GROUP_ID_CONFIG, "responder-group");
//        props.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
//        props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, Alert.class.getName()); // Force mapping to your Alert class
//
//        return new DefaultKafkaConsumerFactory<>(
//                props,
//                new StringDeserializer(),
//                new JsonDeserializer<>(Alert.class, false)
//        );
//    }
//
//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, Alert> alertKafkaListenerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, Alert> factory =
//                new ConcurrentKafkaListenerContainerFactory<>();
//        factory.setConsumerFactory(alertConsumerFactory());
//        return factory;
//    }
//}
