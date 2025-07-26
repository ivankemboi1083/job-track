const axios = require('axios');
const Job = require('../models/Job');
const { Op } = require('sequelize');

class JobService {
  static async fetchRemoteJobs(category = '', search = '') {
    try {
      let url = 'https://remotive.io/api/remote-jobs';
      const params = {};
      
      if (category) params.category = category;
      if (search) params.search = search;

      const response = await axios.get(url, { params });
      const jobs = response.data.jobs;

      // Process and store jobs in database
      for (const job of jobs) {
        await Job.findOrCreate({
          where: { remoteId: job.id.toString() },
          defaults: {
            title: job.title,
            company: job.company_name,
            category: job.category,
            jobType: job.job_type,
            location: job.candidate_required_location,
            description: job.description,
            applyUrl: job.url,
            salary: job.salary,
            tags: job.tags,
            postedAt: new Date(job.publication_date)
          }
        });
      }

      return jobs;
    } catch (error) {
      console.error('Error fetching remote jobs:', error);
      throw error;
    }
  }

  static async searchJobs(query) {
    try {
      const where = {};
      if (query.keyword) {
        where[Op.or] = [
          { title: { [Op.like]: `%${query.keyword}%` } },
          { description: { [Op.like]: `%${query.keyword}%` } }
        ];
      }
      if (query.category) {
        where.category = query.category;
      }

      return await Job.findAll({
        where,
        order: [['postedAt', 'DESC']],
        limit: query.limit || 50,
        offset: query.offset || 0
      });
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }

  static async getJobById(id) {
    try {
      return await Job.findByPk(id);
    } catch (error) {
      console.error('Error getting job:', error);
      throw error;
    }
  }
}

module.exports = JobService; 