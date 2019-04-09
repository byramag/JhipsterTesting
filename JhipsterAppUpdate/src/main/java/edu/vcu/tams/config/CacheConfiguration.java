package edu.vcu.tams.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(edu.vcu.tams.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(edu.vcu.tams.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Applicant.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName() + ".gradings", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName() + ".availabilities", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName() + ".notes", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName() + ".sections", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName() + ".courseQualifieds", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName() + ".courseHasExperiences", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Ta.class.getName() + ".availableRoles", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Faculty.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Faculty.class.getName() + ".sections", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Course.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Course.class.getName() + ".sections", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Course.class.getName() + ".qualifiedTas", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Course.class.getName() + ".experiencedTas", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Section.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Section.class.getName() + ".docs", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Section.class.getName() + ".lectureTimes", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Section.class.getName() + ".labTimes", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Section.class.getName() + ".taNotes", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Section.class.getName() + ".facutlyNotes", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Section.class.getName() + ".tas", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Assignment.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Assignment.class.getName() + ".gradings", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Assignment.class.getName() + ".docs", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Grading.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.TimeWindow.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.TANote.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.FacultyNote.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.TaRole.class.getName(), jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.TaRole.class.getName() + ".tas", jcacheConfiguration);
            cm.createCache(edu.vcu.tams.domain.Document.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
