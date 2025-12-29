import React, { useState } from "react";
import { Container, Row, Col, Button, Table, 
    Badge, Modal, Card, Pagination, Nav, Form, InputGroup, ButtonGroup }
from "react-bootstrap";
    
const defaultConfig = {
    service_name: "리뷰 댓글 관리",
    footer_text: "© 2024 리뷰 관리 시스템",
    primary_color: "#0d6efd",
    success_color: "#28a745",
    text_primary: "#212529",
    background_color: "#f8f9fa",
    card_bg: "#ffffff",
    font_family: "Segoe UI"
};

const sampleReviews = [
    { id: 1, text: "음식이 정말 맛있었어요! 다음에도 또 올게요.", author: "김민수", status: "답변 대기", date: "2024-01-15" },
    { id: 2, text: "서비스가 친절하고 분위기도 좋았습니다.", author: "이지은", status: "답변 완료", date: "2024-01-14" },
    { id: 3, text: "가격 대비 양이 많아서 좋았어요.", author: "박준혁", status: "답변 대기", date: "2024-01-14" },
    { id: 4, text: "배달이 빨라서 따뜻하게 받았습니다!", author: "최유리", status: "답변 대기", date: "2024-01-13" },
    { id: 5, text: "재료가 신선하고 맛있었어요. 추천합니다!", author: "정현우", status: "답변 완료", date: "2024-01-13" },
    { id: 6, text: "포장도 깔끔하고 맛도 최고였습니다.", author: "강서연", status: "답변 대기", date: "2024-01-12" },
    { id: 7, text: "직원분들이 정말 친절하세요. 감사합니다!", author: "임도윤", status: "답변 완료", date: "2024-01-12" },
    { id: 8, text: "분위기가 아늑하고 데이트하기 좋았어요.", author: "한예진", status: "답변 대기", date: "2024-01-11" },
    { id: 9, text: "메뉴가 다양하고 맛있어요!", author: "윤서준", status: "답변 완료", date: "2024-01-11" },
    { id: 10, text: "가성비가 좋습니다. 추천해요.", author: "조민지", status: "답변 대기", date: "2024-01-10" },
    { id: 11, text: "직원 분들이 정말 친절하게 대해주셨어요.", author: "신동혁", status: "답변 완료", date: "2024-01-10" },
    { id: 12, text: "음식이 빨리 나와서 좋았습니다.", author: "홍수진", status: "답변 대기", date: "2024-01-09" }
];

const suggestionsPool = {
    formal: [
        "소중한 리뷰 감사드립니다. 앞으로도 더 나은 서비스로 보답하겠습니다.",
        "방문해 주셔서 감사합니다. 다음에 또 뵙기를 기대하겠습니다.",
        "좋은 말씀 감사드립니다. 고객님의 만족이 저희의 가장 큰 기쁨입니다.",
        "따뜻한 리뷰 감사합니다. 항상 최선을 다하는 저희가 되겠습니다.",
        "응원해 주셔서 감사합니다. 더욱 발전하는 모습 보여드리겠습니다.",
        "귀한 시간 내어 리뷰 남겨주셔서 감사합니다. 다음 방문도 기다리겠습니다."
    ],
    friendly: [
        "소중한 리뷰 감사합니다! 앞으로도 더 나은 서비스로 보답하겠습니다. 🙏",
        "방문해 주셔서 감사합니다! 다음에 또 뵙기를 기대하겠습니다. 😊",
        "좋은 말씀 감사드립니다. 고객님의 만족이 저희의 가장 큰 기쁨입니다! ✨",
        "따뜻한 리뷰 감사합니다. 항상 최선을 다하는 저희가 되겠습니다! 💚",
        "응원해 주셔서 감사합니다! 더욱 발전하는 모습 보여드리겠습니다. 🌟",
        "귀한 시간 내어 리뷰 남겨주셔서 감사합니다. 다음 방문도 기다리겠습니다! 🎉"
    ],
    casual: [
        "리뷰 감사해요! 다음에도 또 놀러오세요~ 🙌",
        "방문해주셔서 감사해요! 또 뵈어요~ 😄",
        "좋은 리뷰 남겨주셔서 너무 감사드려요! 💕",
        "따뜻한 리뷰 정말 감사해요~ 더 열심히 할게요! 🔥",
        "응원해주셔서 감사해요! 앞으로도 기대해주세요~ ✨",
        "소중한 리뷰 감사드려요! 다음 방문도 기다릴게요~ 🎊"
    ]
};

const App = () => {
    const [config, setConfig] = useState(defaultConfig);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('전체');
    const [toneStyle, setToneStyle] = useState('friendly');
    const [showAdoptSuccess, setShowAdoptSuccess] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    
    const itemsPerPage = 10;

    const generateSuggestions = (tone) => {
        const pool = suggestionsPool[tone];
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    };

    const handleReviewClick = (review) => {
        setSelectedReview(review);
        setSuggestions(generateSuggestions(toneStyle));
        setSelectedSuggestion(null);
        setShowAdoptSuccess(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReview(null);
        setSelectedSuggestion(null);
        setShowAdoptSuccess(false);
    };

    const handleRegenerate = () => {
        setSuggestions(generateSuggestions(toneStyle));
        setSelectedSuggestion(null);
        setShowAdoptSuccess(false);
    };

    const handleSuggestionClick = (index) => {
        setSelectedSuggestion(index);
        setTimeout(() => setSelectedSuggestion(null), 1000);
    };

    const handleToneChange = (tone) => {
        setToneStyle(tone);
        setSuggestions(generateSuggestions(tone));
        setSelectedSuggestion(null);
        setShowAdoptSuccess(false);
    };

    const handleAdopt = (index) => {
        setShowAdoptSuccess(true);
        setTimeout(() => {
            setShowAdoptSuccess(false);
        }, 2000);
    };

    const handleSearchReset = () => {
        setSearchText('');
        setStartDate('');
        setEndDate('');
        setStatusFilter('전체');
        setCurrentPage(1);
    };

    const customFont = `${config.font_family || defaultConfig.font_family}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

    const completedCount = sampleReviews.filter(r => r.status === '답변 완료').length;
    const pendingCount = sampleReviews.filter(r => r.status === '답변 대기').length;

    // 필터링 로직
    const filteredReviews = sampleReviews.filter(review => {
        // 텍스트 검색
        if (searchText && !review.text.toLowerCase().includes(searchText.toLowerCase()) && 
            !review.author.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }

        // 기간 필터
        if (startDate && review.date < startDate) {
            return false;
        }
        if (endDate && review.date > endDate) {
            return false;
        }

        // 상태 필터
        if (statusFilter !== '전체' && review.status !== statusFilter) {
            return false;
        }

        return true;
    });

    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

    return (

        <div style={{ 
                fontFamily: customFont, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
                backgroundColor: config.background_color || defaultConfig.background_color 
            }}
        >
            {/* 상단바 */}
            <div style={{ 
                    backgroundColor: config.card_bg || defaultConfig.card_bg, 
                    borderBottom: '1px solid #dee2e6', padding: '1.5rem', display: 'flex', 
                    justifyContent: 'space-between', alignItems: 'center' 
                }}>
                <h1 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    margin: 0,
                    color: config.text_primary || defaultConfig.text_primary 
                }}>
                    {config.service_name || defaultConfig.service_name}
                </h1>
                <Button 
                    style={{
                        backgroundColor: config.primary_color || defaultConfig.primary_color,
                        border: 'none',
                        fontWeight: 'bold',
                        padding: '0.5rem 1.5rem'
                    }}
                    onClick={() => setShowLoginModal(true)}
                >
                    <i className="bi bi-person-circle me-2"></i>로그인
                </Button>
            </div>

            {/* 탭 네비게이션 */}
            <div style={{ backgroundColor: config.card_bg || defaultConfig.card_bg, borderBottom: '2px solid #dee2e6' }}>
                <Nav variant="tabs" style={{ paddingLeft: '2rem', border: 'none' }}>
                    <Nav.Item>
                        <Nav.Link 
                            active={activeTab === 'dashboard'}
                            onClick={() => setActiveTab('dashboard')}
                            style={{
                            cursor: 'pointer',
                            color: activeTab === 'dashboard' ? config.primary_color || defaultConfig.primary_color : '#6c757d',
                            borderColor: activeTab === 'dashboard' ? config.primary_color || defaultConfig.primary_color : 'transparent',
                            borderBottom: activeTab === 'dashboard' ? `3px solid ${config.primary_color || defaultConfig.primary_color}` : 'none',
                            fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal'
                            }}
                        >
                            <i className="bi bi-bar-chart-fill me-2"></i>대시보드
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link 
                            active={activeTab === 'reviews'}
                            onClick={() => setActiveTab('reviews')}
                            style={{
                            cursor: 'pointer',
                            color: activeTab === 'reviews' ? config.primary_color || defaultConfig.primary_color : '#6c757d',
                            borderColor: activeTab === 'reviews' ? config.primary_color || defaultConfig.primary_color : 'transparent',
                            borderBottom: activeTab === 'reviews' ? `3px solid ${config.primary_color || defaultConfig.primary_color}` : 'none',
                            fontWeight: activeTab === 'reviews' ? 'bold' : 'normal'
                            }}
                        >
                            <i className="bi bi-chat-dots-fill me-2"></i>리뷰 관리
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            {/* 메인 컨텐츠 */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                {activeTab === 'dashboard' && (
                    <div>
                        {/* 통계 카드 */}
                        <Row className="mb-4">
                            <Col md={6} className="mb-3">
                                <Card style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)', backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                                    <Card.Body>
                                        <h5 style={{ color: '#6c757d', fontSize: '0.875rem', marginBottom: '0.5rem' }}>총 댓글 수</h5>
                                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: config.primary_color || defaultConfig.primary_color, margin: 0 }}>
                                            {sampleReviews.length}
                                        </h2>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Card style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)', backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                                    <Card.Body>
                                        <h5 style={{ color: '#6c757d', fontSize: '0.875rem', marginBottom: '0.5rem' }}>평균 평점</h5>
                                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: config.success_color || defaultConfig.success_color, margin: 0 }}>
                                            4.7 ⭐
                                        </h2>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* 그래프 영역 */}
                        <Row>
                            <Col md={6} className="mb-4">
                                <Card style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)', backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                                    <Card.Body>
                                        <h5 style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: config.text_primary || defaultConfig.text_primary }}>일별 댓글 수</h5>
                                        <div style={{ position: 'relative', height: '250px', display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                            {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
                                                const heights = [60, 75, 55, 85, 70, 90, 65];
                                                const count = Math.floor(heights[index] / 10);
                                                return (
                                                    <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <div 
                                                            style={{ 
                                                            width: '100%', 
                                                            height: `${heights[index]}%`, 
                                                            backgroundColor: config.primary_color || defaultConfig.primary_color,
                                                            borderRadius: '8px 8px 0 0',
                                                            transition: 'all 0.3s ease',
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'center',
                                                            paddingTop: '0.5rem',
                                                            color: 'white',
                                                            fontWeight: 'bold',
                                                            fontSize: '0.875rem'
                                                            }}
                                                        >
                                                            {count}
                                                        </div>
                                                        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6c757d', fontWeight: '500' }}>
                                                            {day}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} className="mb-4">
                                <Card style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)', backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                                    <Card.Body>
                                        <h5 style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: config.text_primary || defaultConfig.text_primary }}>평점 분포</h5>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                            { stars: 5, count: 45, percentage: 75 },
                                            { stars: 4, count: 12, percentage: 20 },
                                            { stars: 3, count: 2, percentage: 3 },
                                            { stars: 2, count: 1, percentage: 1.5 },
                                            { stars: 1, count: 0, percentage: 0.5 }
                                            ].map(item => (
                                                <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ minWidth: '60px', fontSize: '0.875rem', color: '#6c757d', fontWeight: '500' }}>
                                                        {item.stars}⭐
                                                    </div>
                                                    <div style={{ flex: 1, backgroundColor: '#e9ecef', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                                                        <div 
                                                            style={{ 
                                                            width: `${item.percentage}%`, 
                                                            height: '100%', 
                                                            backgroundColor: config.success_color || defaultConfig.success_color,
                                                            transition: 'width 0.5s ease'
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div style={{ minWidth: '40px', fontSize: '0.875rem', fontWeight: 'bold', textAlign: 'right' }}>
                                                        {item.count}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* 상태별 통계 */}
                        <Row>
                            <Col>
                                <Card style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)', backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                                    <Card.Body>
                                        <h5 style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: config.text_primary || defaultConfig.text_primary }}>답변 상태</h5>
                                        <Row>
                                            <Col md={6}>
                                                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                                    <h3 style={{ color: config.success_color || defaultConfig.success_color, marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 'bold' }}>
                                                        {completedCount}
                                                    </h3>
                                                    <p style={{ color: '#6c757d', margin: 0, fontSize: '1rem', fontWeight: '500' }}>답변 완료</p>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div style={{ textAlign: 'center', padding: '2rem 1rem', borderLeft: '1px solid #dee2e6' }}>
                                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                                                    <h3 style={{ color: '#ffc107', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 'bold' }}>
                                                    {pendingCount}
                                                    </h3>
                                                    <p style={{ color: '#6c757d', margin: 0, fontSize: '1rem', fontWeight: '500' }}>답변 대기</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        {/* 검색 필터 영역 */}
                        <Card className="mb-4" style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)', backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                            <Card.Body>
                                <Row className="g-3">
                                    <Col md={4}>
                                        <Form.Label style={{ color: config.text_primary || defaultConfig.text_primary, fontWeight: '500', fontSize: '0.875rem' }}>
                                            <i className="bi bi-search me-2"></i>검색어
                                        </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="댓글 내용 또는 작성자 검색"
                                            value={searchText}
                                            onChange={(e) => {
                                            setSearchText(e.target.value);
                                            setCurrentPage(1);
                                            }}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label style={{ color: config.text_primary || defaultConfig.text_primary, fontWeight: '500', fontSize: '0.875rem' }}>
                                            <i className="bi bi-calendar-range me-2"></i>시작 날짜
                                        </Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label style={{ color: config.text_primary || defaultConfig.text_primary, fontWeight: '500', fontSize: '0.875rem' }}>
                                            <i className="bi bi-calendar-check me-2"></i>종료 날짜
                                        </Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            value={endDate}
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label style={{ color: config.text_primary || defaultConfig.text_primary, fontWeight: '500', fontSize: '0.875rem' }}>
                                            <i className="bi bi-funnel me-2"></i>상태 구분
                                        </Form.Label>
                                        <Form.Select 
                                            value={statusFilter}
                                            onChange={(e) => {
                                                setStatusFilter(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            <option value="전체">전체</option>
                                            <option value="답변 완료">답변 완료</option>
                                            <option value="답변 대기">답변 대기</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: config.text_primary || defaultConfig.text_primary, fontSize: '0.875rem' }}>
                                        <i className="bi bi-info-circle me-2"></i>
                                        총 <strong>{filteredReviews.length}</strong>개의 리뷰
                                    </div>
                                    <Button 
                                        variant="outline-secondary" 
                                        size="sm"
                                        onClick={handleSearchReset}
                                    >
                                        <i className="bi bi-arrow-clockwise me-1"></i>초기화
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* 리뷰 테이블 */}
                        <Card style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)', backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                            <Table hover responsive className="mb-0">
                                <thead style={{ backgroundColor: config.background_color || defaultConfig.background_color }}>
                                    <tr>
                                        <th style={{ color: config.text_primary || defaultConfig.text_primary }}>댓글</th>
                                        <th style={{ color: config.text_primary || defaultConfig.text_primary }}>작성자</th>
                                        <th style={{ color: config.text_primary || defaultConfig.text_primary }}>상태구분</th>
                                        <th style={{ color: config.text_primary || defaultConfig.text_primary }}>작성날짜</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentReviews.length > 0 ? (
                                        currentReviews.map(review => (
                                            <tr 
                                                key={review.id}
                                                onClick={() => handleReviewClick(review)}
                                                style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = config.background_color || defaultConfig.background_color}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <td style={{ color: config.text_primary || defaultConfig.text_primary }}>{review.text}</td>
                                                <td style={{ color: config.text_primary || defaultConfig.text_primary }}>{review.author}</td>
                                                <td>
                                                    <Badge bg={review.status === '답변 완료' ? 'success' : 'warning'} text={review.status === '답변 완료' ? 'light' : 'dark'}>
                                                    {review.status}
                                                    </Badge>
                                                </td>
                                                <td style={{ color: config.text_primary || defaultConfig.text_primary }}>{review.date}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>
                                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                                                <div>검색 결과가 없습니다.</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card>

                        {/* 페이지네이션 */}
                        {totalPages > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                <Pagination>
                                    <Pagination.Prev 
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                    이전
                                    </Pagination.Prev>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <Pagination.Item
                                            key={index}
                                            active={currentPage === index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}

                                    <Pagination.Next 
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                    다음
                                    </Pagination.Next>
                                </Pagination>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 푸터 */}
            <div style={{ 
                backgroundColor: config.card_bg || defaultConfig.card_bg, 
                borderTop: '1px solid #dee2e6', 
                textAlign: 'center', 
                padding: '1rem' 
            }}>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.875rem' }}>
                    {config.footer_text || defaultConfig.footer_text}
                </p>
            </div>

            {/* 추천 답변 모달 */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton style={{ backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                    <Modal.Title>
                        <div>
                            <h5 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: config.text_primary || defaultConfig.text_primary }}>추천 답변</h5>
                            <p style={{ margin: 0, color: '#6c757d', fontSize: '0.875rem' }}>
                            "{selectedReview?.text}" - {selectedReview?.author}
                            </p>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                    {/* 말투 선택 버튼 */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ marginBottom: '0.75rem', color: config.text_primary || defaultConfig.text_primary, fontWeight: '500', fontSize: '0.875rem' }}>
                            <i className="bi bi-chat-left-text me-2"></i>말투 설정
                        </div>
                        <ButtonGroup style={{ width: '100%' }}>
                            <Button
                                variant={toneStyle === 'formal' ? 'primary' : 'outline-secondary'}
                                onClick={() => handleToneChange('formal')}
                                style={{
                                    flex: 1,
                                    backgroundColor: toneStyle === 'formal' ? config.primary_color || defaultConfig.primary_color : 'transparent',
                                    borderColor: toneStyle === 'formal' ? config.primary_color || defaultConfig.primary_color : '#6c757d',
                                    color: toneStyle === 'formal' ? 'white' : '#6c757d'
                                }}
                            >
                            격식체
                            </Button>
                            <Button
                                variant={toneStyle === 'friendly' ? 'primary' : 'outline-secondary'}
                                onClick={() => handleToneChange('friendly')}
                                style={{
                                    flex: 1,
                                    backgroundColor: toneStyle === 'friendly' ? config.primary_color || defaultConfig.primary_color : 'transparent',
                                    borderColor: toneStyle === 'friendly' ? config.primary_color || defaultConfig.primary_color : '#6c757d',
                                    color: toneStyle === 'friendly' ? 'white' : '#6c757d'
                                }}
                            >
                            친근체
                            </Button>
                            <Button
                                variant={toneStyle === 'casual' ? 'primary' : 'outline-secondary'}
                                onClick={() => handleToneChange('casual')}
                                style={{
                                    flex: 1,
                                    backgroundColor: toneStyle === 'casual' ? config.primary_color || defaultConfig.primary_color : 'transparent',
                                    borderColor: toneStyle === 'casual' ? config.primary_color || defaultConfig.primary_color : '#6c757d',
                                    color: toneStyle === 'casual' ? 'white' : '#6c757d'
                                }}
                            >
                            반말체
                            </Button>
                        </ButtonGroup>
                    </div>

                    {/* 성공 메시지 */}
                    {showAdoptSuccess && (
                        <div style={{ 
                            backgroundColor: '#d4edda', 
                            border: '1px solid #c3e6cb', 
                            color: '#155724', 
                            padding: '1rem', 
                            borderRadius: '0.375rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <i className="bi bi-check-circle-fill" style={{ fontSize: '1.25rem' }}></i>
                            <span style={{ fontWeight: '500' }}>답변이 채택되었습니다!</span>
                        </div>
                    )}

                    {/* 추천 답변 목록 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                        {suggestions.map((suggestion, index) => (
                            <Card 
                                key={index}
                                onClick={() => handleSuggestionClick(index)}
                                style={{ 
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    border: selectedSuggestion === index ? 
                                    `2px solid ${config.success_color || defaultConfig.success_color}` : 
                                    '1px solid #dee2e6',
                                    backgroundColor: selectedSuggestion === index ? '#d4edda' : config.card_bg || defaultConfig.card_bg
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedSuggestion !== index) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 0.25rem 0.75rem rgba(0,0,0,0.15)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <Card.Body>
                                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'start', flex: 1 }}>
                                            <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{index + 1}️⃣</span>
                                            <p style={{ margin: 0, color: config.text_primary || defaultConfig.text_primary, flex: 1 }}>{suggestion}</p>
                                        </div>
                                        <Button 
                                            size="sm"
                                            style={{
                                            backgroundColor: config.success_color || defaultConfig.success_color,
                                            border: 'none',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap'
                                            }}
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            handleAdopt(index);
                                            }}
                                        >
                                            <i className="bi bi-check-lg me-1"></i>채택
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <Button 
                        style={{
                            width: '100%',
                            backgroundColor: config.primary_color || defaultConfig.primary_color,
                            border: 'none',
                            fontWeight: 'bold'
                        }}
                        onClick={handleRegenerate}
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        다시 생성하기
                    </Button>
                </Modal.Body>
            </Modal>

            {/* 로그인 모달 */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: config.card_bg || defaultConfig.card_bg }}>
                    <Modal.Title>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', color: config.primary_color || defaultConfig.primary_color }}></i>
                        <h5 style={{ fontWeight: 'bold', margin: 0, color: config.text_primary || defaultConfig.text_primary }}>로그인</h5>
                    </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: config.card_bg || defaultConfig.card_bg, padding: '2rem' }}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: config.text_primary || defaultConfig.text_primary, fontWeight: '500' }}>
                                <i className="bi bi-envelope me-2"></i>이메일
                            </Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="이메일을 입력하세요"
                                style={{ padding: '0.75rem' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label style={{ color: config.text_primary || defaultConfig.text_primary, fontWeight: '500' }}>
                                <i className="bi bi-lock me-2"></i>비밀번호
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="비밀번호를 입력하세요"
                                style={{ padding: '0.75rem' }}
                            />
                        </Form.Group>
                        <Button 
                            type="submit"
                            style={{
                            width: '100%',
                            backgroundColor: config.primary_color || defaultConfig.primary_color,
                            border: 'none',
                            fontWeight: 'bold',
                            padding: '0.75rem'
                            }}
                        >
                            로그인
                        </Button>
                        <div style={{ textAlign: 'center', marginTop: '1rem', color: '#6c757d', fontSize: '0.875rem' }}>
                            <span>계정이 없으신가요? </span>
                            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: config.primary_color || defaultConfig.primary_color, textDecoration: 'none', fontWeight: '500' }}>
                                회원가입
                            </a>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default App;